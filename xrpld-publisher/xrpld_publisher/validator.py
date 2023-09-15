#!/usr/bin/env python
# coding: utf-8

from basedir import basedir
import os
from typing import Dict, Any, List  # noqa: F401
import subprocess

from xrpld_publisher.utils import read_json, read_txt


class ValidatorClient(object):
    name: str = ""  # node1 | node2 | signer
    keystore_path: str = ""
    bin_path: str = ""
    key_path: str = ""

    def __init__(cls, name: str) -> None:
        cls.name = name
        cls.keystore_path = os.path.join(basedir, f"keystore")
        cls.bin_path: str = os.path.join(basedir, "bin/validator-keys")
        cls.key_path = os.path.join(cls.keystore_path, f"{cls.name}/key.json")

    def get_keys(cls):
        try:
            return read_json(cls.key_path)
        except Exception as e:
            print(e)
            return None

    def create_keys(cls) -> str:
        keys = cls.get_keys()
        if keys:
            return keys
        args1 = [cls.bin_path, "create_keys", "--keyfile", cls.key_path]
        subprocess.call(args1)
        return read_json(cls.key_path)

    def set_domain(cls, domain: str) -> None:
        args1 = [cls.bin_path, "set_domain", domain, "--keyfile", cls.key_path]
        subprocess.call(args1)

    def create_token(cls) -> str:
        # cls.set_domain(domain)
        token_path = os.path.join(cls.keystore_path, f"{cls.name}/token.txt")
        out = open(token_path, "w")
        args = [cls.bin_path, "create_token", "--keyfile", cls.key_path]
        subprocess.call(args, stdout=out)
        return read_txt(token_path)

    def create_manifest(cls) -> str:
        manifest_path = os.path.join(cls.keystore_path, f"{cls.name}/manifest.txt")
        out = open(manifest_path, "w")
        args = [
            cls.bin_path,
            "show_manifest",
            "base64",
            "--keyfile",
            cls.key_path,
        ]
        subprocess.call(args, stdout=out)
        return read_txt(manifest_path)

    def read_manifest(cls) -> str:
        manifest_path = os.path.join(cls.keystore_path, f"{cls.name}/manifest.txt")
        manifest = read_txt(manifest_path)
        return manifest[1].replace("\n", "")
