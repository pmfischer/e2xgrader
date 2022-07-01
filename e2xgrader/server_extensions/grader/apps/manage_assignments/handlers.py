import sys

from tornado import web
from nbgrader.server_extensions.formgrader.base import (
    check_xsrf,
    check_notebook_dir,
)
from e2xgrader.server_extensions.grader.apps.base.handlers.base import E2xHandler
from e2xgrader.server_extensions.grader.apps.e2xgraderapi.base import E2xApiHandler


class E2xGraderMainHandler(E2xHandler, E2xApiHandler):
    @check_xsrf
    @check_notebook_dir
    @web.authenticated
    def get(self):
        html = self.render(
            "index.html",
            base_url=self.base_url,
            url_prefix=self.url_prefix,
            windows=(sys.prefix == "win32"),
            course_id=(self.api.course_id),
            exchange_missing=bool(self.api.exchange_missing),
        )
        self.write(html)


default_handlers = [
    (r"e2xgrader/?.*", E2xGraderMainHandler),
]
