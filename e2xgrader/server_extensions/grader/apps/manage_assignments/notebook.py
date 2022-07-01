from notebook.notebook.handlers import (
    FilesRedirectHandler,
    NotebookHandler,
    get_frontend_exporters,
)
from notebook.base.handlers import path_regex
from notebook.utils import maybe_future
from tornado import web, gen


class E2xNotebookHandler(NotebookHandler):
    @web.authenticated
    @gen.coroutine
    def get(self, path):
        """get renders the notebook template if a name is given, or
        redirects to the '/files/' handler if the name is not given."""
        path = path.strip("/")
        cm = self.contents_manager

        # will raise 404 on not found
        try:
            model = yield maybe_future(cm.get(path, content=False))
        except web.HTTPError as e:
            if e.status_code == 404 and "files" in path.split("/"):
                # 404, but '/files/' in URL, let FilesRedirect take care of it
                return FilesRedirectHandler.redirect_to_files(self, path)
            else:
                raise
        if model["type"] != "notebook":
            # not a notebook, redirect to files
            return FilesRedirectHandler.redirect_to_files(self, path)
        name = path.rsplit("/", 1)[-1]
        self.write(
            self.render_template(
                "e2xnotebook.html",
                notebook_path=path,
                notebook_name=name,
                kill_kernel=False,
                mathjax_url=self.mathjax_url,
                mathjax_config=self.mathjax_config,
                get_frontend_exporters=get_frontend_exporters,
            )
        )


handlers = [
    (r"/e2xnotebooks%s" % path_regex, E2xNotebookHandler),
]
