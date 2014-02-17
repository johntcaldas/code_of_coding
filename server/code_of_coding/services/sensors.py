"""
Sensor Service

This service interfaces with the linux 'sensors' command.

"""
import re

from code_of_coding.services import utils

class SensorService():

    def get_sensor_data(self):
        """
        Call 'sensors', pull out the cpu, mb, and vid temps.
        Return these as separate values, along with the whole dump of the command.
        """

        sensors_by_line = utils.get_command_output_by_line(self, 'sensors')

        cpu_temp = ""
        mb_temp = ""
        vid_temp = ""

        for line in sensors_by_line:

            if "CPU Temperature" in line:
                cpu_temp = self._get_first_temp_in_sensor_line(line)

            elif "MB Temperature" in line:
                mb_temp = self._get_first_temp_in_sensor_line(line)

            elif "temp1" in line:
                vid_temp = self._get_first_temp_in_sensor_line(line)

        get_sensor_data_result = {
            'sensors_by_line': sensors_by_line,
            'cpu_temp': cpu_temp,
            'mb_temp': mb_temp,
            'vid_temp': vid_temp
        }

        return get_sensor_data_result


    def _get_first_temp_in_sensor_line(self, line=""):
        temp = ""
        match_obj = re.search("\\+[0-9]......", line, re.I)
        if match_obj is not None:
            temp = match_obj.group()

        return temp

