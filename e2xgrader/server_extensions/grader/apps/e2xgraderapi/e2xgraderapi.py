import os
from nbgrader.apps.baseapp import NbGrader

from e2xgrader.server_extensions.grader.apps.base import BaseApp

from .apihandlers import default_handlers

template_path = os.path.join(os.path.dirname(__file__), "templates")


class E2xGraderApi(NbGrader, BaseApp):
    def __init__(self, **kwargs):
        NbGrader.__init__(self, **kwargs)
        BaseApp.__init__(self, **kwargs)

    def load_app(self):
        self.log.info("Loading the e2xgrader api app")
        self.add_template_path(template_path)

        # self.update_tornado_settings(tornado_settings)
        self.add_handlers(default_handlers)
