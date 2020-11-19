define([
    'base/js/namespace'
], function(Jupyter) {

    function is_test_cell(cell) {
        return is_nbgrader_cell(cell) && 
               cell.metadata.nbgrader.locked && 
               cell.metadata.nbgrader.grade && 
               !cell.metadata.nbgrader.solution;
    }

    function is_description_cell(cell) {
        return is_nbgrader_cell(cell) &&
               cell.metadata.nbgrader.locked &&
               !cell.metadata.nbgrader.grade &&
               !cell.metadata.nbgrader.solution;
    }

    function is_nbgrader_cell(cell) {
        return cell.metadata.hasOwnProperty('nbgrader');
    }

    function is_empty_cell(cell) {
        return cell.code_mirror.getValue().length == 0
    }

    function is_solution_cell(cell) {
        return is_nbgrader_cell(cell) && cell.metadata.nbgrader.solution;
    }

    function is_extra_cell(cell){
        return is_solution_cell(cell) && cell.metadata.hasOwnProperty('extended_cell');
    }

    function is_assignment_notebook() {
        let is_nbgrader = false;
        Jupyter.notebook.get_cells().some(function (cell) {
            is_nbgrader = is_nbgrader_cell(cell);
            return is_nbgrader;
        });
        return is_nbgrader;
    }

    return {
        is_test_cell: is_test_cell,
        is_nbgrader_cell: is_nbgrader_cell,
        is_description_cell: is_description_cell,
        is_empty_cell: is_empty_cell,
        is_solution_cell: is_solution_cell,
        is_extra_cell: is_extra_cell,
        is_assignment_notebook: is_assignment_notebook
    }

});