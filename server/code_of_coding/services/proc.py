"""
Procfs Service

This service interfaces with the linux procfs API

"""

#import sys
#sys.path.append("procfs")
from procfs import Proc
# use this if you want to include modules from a subforder
#import os, sys, inspect
#cmd_subfolder = os.path.realpath(os.path.abspath(os.path.join(os.path.split(inspect.getfile( inspect.currentframe() ))[0],"subfolder")))
#if cmd_subfolder not in sys.path:
#    sys.path.insert(0, cmd_subfolder)

class ProcService():
    def get_summary(self):
        proc = Proc()
        #summary = []
        #summary.append(proc.loadavg)
        #summary.append(proc.cpuinfo)

        return proc.meminfo