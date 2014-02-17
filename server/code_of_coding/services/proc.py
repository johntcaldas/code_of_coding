"""
Procfs Service

This service interfaces with the linux procfs API. More specifically, the library 'procfs' does that for us. This
service-layer module wraps procfs and creates python dictionaries with useful info we're interested in.

"""

from procfs import Proc

class ProcService():
    def get_summary(self):
        proc = Proc()

        p_meminfo = proc.meminfo
        meminfo = {}

        # All memory values come to us in kilobytes, we convert to megabytes
        megabyte_multiplier = 0.000976563
        # Total usable ram (i.e. physical ram minus a few reserved bits and the kernel binary code)
        meminfo['total_mb'] = p_meminfo.MemTotal * megabyte_multiplier
        meminfo['free_mb'] = p_meminfo.MemFree * megabyte_multiplier

        ret = {}
        ret['meminfo'] = meminfo
        return ret