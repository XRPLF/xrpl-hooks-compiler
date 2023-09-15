#!/usr/bin/env python
# coding: utf-8

import base64
import json
from typing import Dict, Any  # noqa: F401
import yaml
import time
from datetime import datetime

rippled_ts: int = 946684800


def from_date_to_effective(date_str: str):
    effective_ts = datetime.strptime(date_str, "%d/%m/%Y").timestamp()
    return effective_ts - rippled_ts


def from_days_to_expiration(days: int):
    current_time: int = int(time.time()) - rippled_ts
    return current_time + (86400 * days)  # expires in x days


def encode_blob(blob: Dict[str, Any]) -> bytes:
    return base64.b64encode(json.dumps(blob).encode("utf-8"))


def decode_blob(blob: str):
    return json.loads(base64.b64decode(blob))


def read_txt(path: str) -> Dict[str, object]:
    """
    Reads txt from file path
    :return: Dict[str, object]
    """
    with open(path) as json_file:
        return json_file.readlines()


def read_file(path: str) -> str:
    """Read File

     # noqa: E501

    :param path: Path to file
    :type path: str

    :rtype: str
    """
    with open(path, "r") as f:
        return f.read()


def read_json(path: str) -> Dict[str, object]:
    """Read Json

     # noqa: E501

    :param path: Path to json
    :type path: str

    :rtype: Dict[str, object]
    """
    with open(path) as json_file:
        return json.load(json_file)


def write_json(data: Dict[str, object], path: str):
    """Write Json

     # noqa: E501

    :param path: Path to json
    :type path: str

    :rtype: None
    """
    with open(path, "w") as json_file:
        json.dump(data, json_file)
    return True


def read_yaml(path: str) -> Dict[str, object]:
    """Read Yaml

     # noqa: E501

    :param path: Path to json
    :type path: str

    :rtype: Dict[str, object]
    """
    with open(path) as yaml_file:
        return yaml.safe_load(yaml_file)
