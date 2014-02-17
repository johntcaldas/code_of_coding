import os

from flask import jsonify

from code_of_coding import app
from code_of_coding.services.sensors import SensorService
from code_of_coding.services.top import TopService
from code_of_coding.services.disks import DiskService
from code_of_coding.services.proc import ProcService

@app.route("/system/summary", methods=['GET'])
def summary():
    proc_service = ProcService()
    summary_data = proc_service.get_summary()
    return jsonify(summary_data)

@app.route("/system/sensors", methods=['GET'])
def sensors():
    sensor_service = SensorService()
    sensor_data = sensor_service.get_sensor_data()

    return jsonify({
        'success': True,
        'cpu_temp': sensor_data['cpu_temp'],
        'mb_temp': sensor_data['mb_temp'],
        'vid_temp': sensor_data['vid_temp'],
        'sensors_by_line': sensor_data['sensors_by_line']
    })


@app.route("/system/top", methods=['GET'])
def system_top():
    top_service = TopService()
    top_data = top_service.get_top_data()

    return jsonify({
        'success': True,
        'first_line': top_data['first_line'],
        'header_by_line': top_data['header_by_line'],
        'column_names': top_data['column_names'],
        'rows': top_data['rows']
    })


@app.route("/system/date", methods=['GET'])
def system_date():
    date_handle = os.popen('date')
    date = date_handle.readline()

    return jsonify({'success': True,
                    'date': date})

@app.route("/system/disks", methods=['GET'])
def get_disks():
    disk_service = DiskService()
    disk_data = disk_service.get_disks()
    return jsonify({
        'success':True,
        'disk_data': disk_data['disk_data'],
        'num_disks': disk_data['num_disks'],
        'num_raid_arrays': disk_data['num_raid_arrays']
    })
