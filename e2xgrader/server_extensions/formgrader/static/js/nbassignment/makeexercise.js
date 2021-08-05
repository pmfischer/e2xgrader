class FormTab {

    constructor($el) {
        this.$el = $el;
    }

    validate() {
        return true;
    }

    getFormData() {
        return {};
    }

}

class ExerciseName extends FormTab {

    constructor() {
        super($('#exercise'));
        this.$input = this.$el.find('#exercise-name');
    }

    validate() {
        if (this.$input.val().trim() === '') {
            createLogModal('validate-exercise-name', 'Invalid exercise name', 'The name of the exercise cannot be empty!');
            return false;
        }
        return true;
    }

    getFormData() {
        return {
            'exercise': this.$input.val()
        }
    }
}

class TemplateSelect extends FormTab {

    constructor() {
        super($('#template'));
        this.$select = $('#template-select');
        this.table = $('#template-variables');
        this.dataTable = this.table.DataTable({
            paging: false,
            searching: false,
            info: false,
            'columnDefs': [
                {'orderable': false, 'targets': -1},
            ],
            language: {
                emptyTable: 'No template selected or template has no variables to set!'
            }
        });
        this.templates = new Templates();
        this.templates.fetch({
            success: () => this.createSelect()
        });
    }

    createSelect() {
        this.$select.empty();
        this.$select.append($('<option/>')
            .attr('value', '')
            .text('Select your template'));
        let that = this;
        this.templates.each(function (template) {
            that.$select.append($('<option/>')
                .attr('value', template.get('name'))
                .text(template.get('name')));
        });
        this.$select.change(function () {
            let choice = $(this).val();
            if (choice !== '') {
                $.ajax({
                    url: base_url + "/taskcreator/api/templates/variables",
                    type: "get",
                    data: {
                        'template': choice
                    },
                    success: function(response) {
                        let options = $.parseJSON(response);
                        that.populateTable(options);
                    },
                    error: function(xhr) {
                        console.log('Oh no!')
                        console.log(xhr)
                    }
                });
            } else {
                that.populateTable([]);
            }
        });
    }

    populateTable(options) {
        let that = this;
        let tbody = this.table.find('tbody');
        this.dataTable.clear();

        options.forEach(function (option) {
            let row = $('<tr/>')
                .append($('<td/>').text(option))
                .append($('<td/>')
                    .append($('<input/>')
                        .attr('type', 'text')
                        .attr('id', option)));
            tbody.append(row);
            that.dataTable.row.add(row).draw();

        });

        this.table.DataTable().draw();
    }

    validate() {
        if (this.$select.val() === '') {
            createLogModal('validate-template', 'No template selected', 'You must select a template!');
            return false;
        }
        return true;
    }

    getFormData() {
        let data = {
            'template': this.$select.val(),
            'template-options': {}
        };
        this.table.find('input').each(function () {
            data['template-options'][$(this).attr('id')] = $(this).val();
        });
        return data;
    }
}



class TaskSelect extends FormTab {

    constructor() {
        super($('#tasks'));
        this.$select = $('#pool-select');
        this.$selected_tasks = $('#selected-tasks');
        this.$available_tasks = $('#available-tasks');
        this.$add = $('#add');
        this.$remove = $('#remove');
        this.$up = $('#up');
        this.$down = $('#down');
        this.registerControls();
        this.pools = new Pools();
        this.data = {};
        let that = this;

        
        this.pools.fetch({
            success: () => that.handleLoadPools()
        });
        this.loadPools();
    }

    registerControls() {
        let that = this;
        this.$add.click(function () {
            let selection = that.$available_tasks.val();
            let pool = that.$select.val();
            selection.forEach(function(option) {
                // Check if option with same value and pool exists
                let existing_option = $('#selected-tasks option[value="' + option + '"]');
                if (existing_option.length < 1 || existing_option.attr('data-pool') !== pool) {
                    that.$selected_tasks.append($('<option/>')
                        .attr('value', option)
                        .attr('data-pool', pool)
                        .text(option));
                }
            });
        });

        this.$remove.click(function () {
            $('#selected-tasks option:selected').each(function(idx, el) {$(this).remove()});
        })

        this.$up.click(function () {
            
            console.log(tasks);

        });

    }

    loadPools() {
        let that = this;
        this.pools.fetch({
            success: function () {
                that.pools.each(function (pool) {
                    //n_pools +=1;
                    that.data[pool.get('name')] = new Tasks({pool: pool.get('name')});
                    that.data[pool.get('name')].fetch({
                        success: function () {
                        }
                    })

                });
                console.log(that.data);
            }
        })
    }

    handleLoadPools() {
        //console.log(this.pools);
        this.$select.empty();
        this.$select.append($('<option/>')
            .attr('value', '')
            .text('Select your task pool'));
        let that = this;
        this.pools.each(function (pool) {
            console.log(pool);
            console.log(pool.get('name'));
            that.$select.append($('<option/>')
                .attr('value', pool.get('name'))
                .text(pool.get('name')));
        });
        
        this.$select.change(function () {
            
            let choice = $(this).val();

            if (choice !== '') {
                
                that.tasks = new Tasks({
                    pool: choice
                });
                that.tasks.fetch({
                    success: () => that.handleLoadTasks()
                })
            }
            
        });
    }

    handleLoadTasks() {
        console.log('Loaded tasks');
        console.log(this.tasks);
        let that = this;
        this.$available_tasks.empty();
        this.tasks.each(function (task) {
            that.$available_tasks.append($('<option/>')
                .attr('value', task.get('name'))
                .attr('title', 'Task: ' + task.get('name') + ', ' + task.get('questions') + ' questions, ' + task.get('points') + ' points')
                .text(task.get('name')));

        })

    }

    getFormData() {
        let tasks = [];
        $('#selected-tasks option').each(function(idx, el) {
            tasks.push({
                task: $(this).val(),
                pool: $(this).attr('data-pool')
            });
        })
        return {
            'tasks': tasks
        }

    }

    validate() {
        return true;
    }
}

class ExerciseOptions extends FormTab {

    constructor() {
        super($('#options'));
        this.$kernel_select = this.$el.find('#kernel-select');
        this.$task_headers = this.$el.find('#task-headers');
        this.createKernelSelect();
    }

    createKernelSelect() {
        let that = this;
        $.ajax({
            url: base_url + "/taskcreator/api/kernelspec",
            type: "get",
            success: function(response) {
                let kernelspecs = $.parseJSON(response);
                for (const [kernel_name, kernelspec] of Object.entries(kernelspecs)) {
                    let option = $('<option/>')
                        .attr('value', kernel_name)
                        .append(kernelspec.spec.display_name);
                    that.$kernel_select.append(option);
                }
            },
            error: function(xhr) {
                console.log('Oh no!')
                console.log(xhr)
            }
        });
    }

    getFormData() {
        return {
            'exercise_options': {
                'kernel': this.$kernel_select.val(),
                'task-headers': this.$task_headers.prop('checked')
            }
        }

    }
}

class TabView {

    constructor() {
        this.tabs = [new ExerciseName(), new TemplateSelect(), new TaskSelect(), new ExerciseOptions()];
        this.current = this.tabs[0];
        this.cursor = 0;
        this.addNavButtons();
    }

    addNavButtons() {
        let that = this;
        for (let i=0;i<this.tabs.length;i++) {
            if (i > 0) {
                this.tabs[i].$el.append($('<button/>')
                    .text('Previous')
                    .addClass('btn btn-primary')
                    .click(() => that.select(i - 1)));
            }
            if (i < this.tabs.length - 1) {
                this.tabs[i].$el.append($('<button/>')
                    .text('Next')
                    .addClass('btn btn-primary')
                    .click(() => that.select(i + 1)));
            }
            
        }
        this.tabs[this.tabs.length - 1].$el.append($('<button/>')
                    .text('Finalize')
                    .addClass('btn btn-primary')
                    .click(() => that.finalize()));
    }

    finalize() {
        alert('Done!');
        let data = {
            assignment: assignment
        };
        this.tabs.forEach((tab) => Object.assign(data, tab.getFormData()));
        $.ajax({
            url: base_url + '/taskcreator/api/generate_exercise',
            type: 'get',
            dataType: 'json',
            data: {
                'resources': JSON.stringify(data)
            },
            success: function(response) {
                window.location.href = base_url + '/notebooks/source/' + assignment + '/' + data['exercise'] + '.ipynb';
            },
            error: function(xhr) {
                console.log('OH NO!');
                console.log(xhr);
                alert('There was an error generating the exercise.');
            }
        });
    }

    validate() {
        return this.current.validate();
    }

    clamp(val) {
        return Math.max(0, Math.min(val, this.tabs.length - 1));
    }

    select(index) {
        let new_index = this.clamp(index);
        if (new_index < this.cursor || this.validate()) {
            this.current.$el.toggle();
            this.current = this.tabs[new_index];
            this.cursor = new_index;
            this.current.$el.toggle();
        }
        
    }
}

$(window).on('load', function () {
    let view = new TabView();
})