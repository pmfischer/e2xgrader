let TemplateUI = BaseUI.extend({

    events: {},

    initialize: function () {
        this.$template_name = this.$el.find('.template-name');
        this.$edit_template = this.$el.find('.edit-template');
        this.$remove_template = this.$el.find('.remove-template');

        this.fields = [this.$template_name, this.$edit_template, this.$remove_template];

        this.listenTo(this.model, 'sync', this.render);
        this.render();
    },

    render: function () {
        this.clear();
        let name = this.model.get('name');
        
        this.$template_name.append($('<a/>')
            .attr('href', tree_url + 'templates/' + name)
            .text(name));
        this.$edit_template.append($('<a/>')
            .attr('href', notebook_url + 'templates/' + name + '/' + name + '.ipynb')
            .text('Edit'));
        this.$remove_template.append($('<a/>')
            .attr('href', '#')
            .click(_.bind(this.removeTemplateModal, this))
            .append($('<span/>').text('Remove')
                ));
    },

    removeTemplateModal: function() {
        let body = $('<div/>');
        body.append($('<p/>').text('Are you sure you want to delete the template?'));
        body.append($('<p/>').text('This action can\'t be undone!'));

        this.openRemoveModal(body, "Delete template " + this.model.get('name') + "?");
    },

});

function insertRow(table) {
    let row = $('<tr/>');
    row.append($('<td/>').addClass('template-name'));
    row.append($('<td/>').addClass('edit-template'));
    row.append($('<td/>').addClass('remove-template'));
    table.append(row);
    dataTable.row.add(row).draw();
    return row;
}

function addView(model, table) {
    let view = new TemplateUI({
        'model': model,
        'el': insertRow(table)
    });
    views.push(view);
}

function loadTemplates() {
    let tbl = $('#main_table');
    models = new Templates();
    views = [];
    models.loaded = false;
    models.fetch({
        success: function () {
            tbl.empty();
            dataTable = tbl.parent().DataTable({
                'columnDefs': [
                    {'orderable': false, 'targets': [-1, -2]},
                    {'searchable': false, 'targets': [-1, -2]}
                ]
            });
            models.each((model) => addView(model, tbl));
            
            models.loaded = true;
        }
    });
}

function newTemplate() {
    let body = $('<div/>').append($('</p>').text(
        `Please specify the name of the new template. Names can consist of characters, 
         digits, spaces and underscores.`));
    let table = $('<table/>').addClass('table table-striped form-table');
    let tablebody = $('<tbody/>');
    body.append(table);
    table.append(tablebody);
    let name = $('<tr/>');
    tablebody.append(name);
    name.append($('<td/>').addClass('align-middle').text('Name'));
    name.append($('<td/>').append($('<input/>')
        .addClass('modal-name')
        .attr('pattern', '[A-Za-z0-9]+')
        .attr('type', 'text')));
    let footer = $('<div/>');
    footer.append($('<button/>')
        .addClass('btn btn-primary save')
        .text('Add Task Template'));
    footer.append($('<button/>')
        .addClass('btn btn-danger')
        .attr('data-dismiss', 'modal')
        .text('Cancel'));

    $modal = createModal("new-template-modal", "Create a new exercise template", body, footer);
    
    $modal_save = $modal.find('button.save');
    $modal_save.click(function () {
        $modal_name = $modal.find('input.modal-name').val();
        let template = new Template();
        template.save({
            'name': $modal_name,
            'tasks': 0
        }, {
            success: function(template) {
            if (template.get('success')) {
                $modal.modal('hide');
                addView(template, $('#main_table'));
                models.add([template]);
            } else {
                createLogModal(
                    'error-modal',
                    'Error',
                    'There was an error creating the template ' + template.get('name') + '!',                    
                    template.get('error'));
            }
        }});
    })

}

let models = undefined;
let views = [];
let dataTable = undefined;

$(window).on('load', function () {
    loadTemplates();
});
