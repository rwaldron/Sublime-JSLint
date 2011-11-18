import commands
import os
import re
import sublime
import sublime_plugin
import subprocess
import tempfile

class JslintCommand(sublime_plugin.TextCommand):
    def is_enabled(self, *args):
        return self.window.active_view() != None

    def run(self, edit):
        # syntax, extension = os.path.splitext(os.path.basename(self.view.settings().get('syntax')))

        # print syntax