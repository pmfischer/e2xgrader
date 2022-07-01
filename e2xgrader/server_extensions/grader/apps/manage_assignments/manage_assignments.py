import os

from tornado import web
from nbgrader.apps.baseapp import NbGrader
from jinja2 import Environment, FileSystemLoader

from e2xgrader.server_extensions.grader.apps.base import BaseApp

from .handlers import default_handlers
from .notebook import handlers as notebook_handlers

root_path = os.path.dirname(__file__)
static_path = os.path.join(root_path, "app", "build", "static")
template_path = os.path.join(root_path, "app", "build")
extra_template_path = os.path.join(root_path, "templates")


class ManageAssignments(NbGrader, BaseApp):
    def __init__(self, **kwargs):
        NbGrader.__init__(self, **kwargs)
        BaseApp.__init__(self, **kwargs)

    def load_app(self):
        self.log.info("Loading the e2xgrader manage assignments app")

        static_handlers = [
            (
                r"/e2xgrader/static/(.*)",
                web.StaticFileHandler,
                {"path": static_path},
            )
        ]

        self.add_template_path(template_path)
        self.add_template_path(extra_template_path)
        self.add_handlers(static_handlers)
        self.add_handlers(default_handlers)
        self.add_handlers(notebook_handlers)

        self.webapp.settings["jinja2_env"].loader.searchpath.append(extra_template_path)
