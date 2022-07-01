import os
from nbgrader.apps.baseapp import NbGrader

from nbgrader.server_extensions.formgrader.apihandlers import default_handlers
from e2xgrader.server_extensions.grader.apps.base import BaseApp
from tornado import web
from .apihandlers import default_handlers


class E2xGraderApi(NbGrader, BaseApp):

    template_path = os.path.join(os.path.dirname(__file__), "templates")
    static_path = os.path.join(os.path.dirname(__file__), "app", "build")

    def __init__(self, **kwargs):
        NbGrader.__init__(self, **kwargs)
        BaseApp.__init__(self, **kwargs)

    def load_app(self):
        self.log.info("Loading the e2xgrader api app")
        self.add_template_path(self.template_path)

        static_handlers = [
            (
                r"/e2x/static/js/(.*)",
                web.StaticFileHandler,
                {"path": self.static_path},
            )
        ]

        self.add_handlers(static_handlers)

        # self.update_tornado_settings(tornado_settings)
        self.add_handlers(default_handlers)
