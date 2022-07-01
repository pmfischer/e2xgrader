import json

from tornado import web
from nbgrader.server_extensions.formgrader.base import check_xsrf
from nbgrader.server_extensions.formgrader.apihandlers import (
    AssignmentCollectionHandler,
    AssignmentHandler,
)
from .base import E2xApiHandler
from e2xgrader.models import PresetModel


class E2xAssignmentCollectionHandler(E2xApiHandler, AssignmentCollectionHandler):
    """
    Inherit from E2xApiHandler to overwrite the internal NbgraderAPI with the E2xAPI
    """

    pass


class E2xAssignmentHandler(E2xApiHandler, AssignmentHandler):
    """
    Inherit from E2xApiHandler to overwrite the internal NbgraderAPI with the E2xAPI
    """

    pass


class SolutionCellCollectionHandler(E2xApiHandler):
    @web.authenticated
    @check_xsrf
    def get(self, assignment_id, notebook_id):
        cells = self.api.get_solution_cell_ids(assignment_id, notebook_id)
        self.write(json.dumps(cells))


class SubmittedTaskCollectionHandler(E2xApiHandler):
    @web.authenticated
    @check_xsrf
    def get(self, assignment_id, notebook_id, task_id):
        submissions = self.api.get_task_submissions(assignment_id, notebook_id, task_id)
        self.write(json.dumps(submissions))


class GenerateFeedbackHandler(E2xApiHandler):
    @web.authenticated
    @check_xsrf
    def post(self, assignment_id, student_id):
        data = self.get_json_body()
        hide_cells = False
        if data is not None:
            hide_cells = self.get_json_body().get("hide_cells", hide_cells)
        self.log.info(hide_cells)
        self.write(
            json.dumps(
                self.api.generate_feedback(
                    assignment_id, student_id, hide_cells=hide_cells
                )
            )
        )


class GenerateAllFeedbackHandler(E2xApiHandler):
    @web.authenticated
    @check_xsrf
    def post(self, assignment_id):
        data = self.get_json_body()
        hide_cells = False
        if data is not None:
            hide_cells = self.get_json_body().get("hide_cells", hide_cells)
        self.log.info(hide_cells)
        self.write(
            json.dumps(self.api.generate_feedback(assignment_id, hide_cells=hide_cells))
        )


class PresetHandler(E2xApiHandler):
    def initialize(self):
        self.__model = PresetModel(self.coursedir)

    def _list_template(self):
        self.write(json.dumps(self.__model.list_template_presets()))

    def _get_template(self):
        name = self.get_argument("name")
        self.write(json.dumps(self.__model.get_template_preset(name)))

    def _list_question(self):
        self.write(json.dumps(self.__model.list_question_presets()))

    def _get_question(self):
        name = self.get_argument("name")
        self.write(json.dumps(self.__model.get_question_preset(name)))

    @web.authenticated
    @check_xsrf
    def get(self):
        action = self.get_argument("action")
        preset_type = self.get_argument("type")
        handler = getattr(self, "_{}_{}".format(action, preset_type))
        handler()


class GraderHandler(E2xApiHandler):
    @web.authenticated
    @check_xsrf
    def get(self):
        e2xgrader_settings = self.settings.get("e2xgrader", dict())
        grader_settings = e2xgrader_settings.get("graders", list())
        self.write(json.dumps(grader_settings))


default_handlers = [
    (r"/formgrader/api/assignments", E2xAssignmentCollectionHandler),
    (r"/formgrader/api/assignment/([^/]+)", E2xAssignmentHandler),
    (r"/formgrader/api/solution_cells/([^/]+)/([^/]+)", SolutionCellCollectionHandler),
    (
        r"/formgrader/api/submitted_tasks/([^/]+)/([^/]+)/([^/]+)",
        SubmittedTaskCollectionHandler,
    ),
    (
        r"/formgrader/api/assignment/([^/]+)/generate_feedback",
        GenerateAllFeedbackHandler,
    ),
    (
        r"/formgrader/api/assignment/([^/]+)/([^/]+)/generate_feedback",
        GenerateFeedbackHandler,
    ),
    (r"/taskcreator/api/presets", PresetHandler),
    (r"/e2xgrader/api/graders", GraderHandler),
]
