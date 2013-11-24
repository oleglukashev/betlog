import sys
from base_app import BaseApp

bookmaker_name = sys.argv[1] if len(sys.argv) > 1 else None

app = BaseApp()
app.doParse( bookmaker_name )
