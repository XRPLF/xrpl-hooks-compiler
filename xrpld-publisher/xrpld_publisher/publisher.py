#!/usr/bin/env python
# coding: utf-8

import base64
import os
from typing import Dict, Any, List  # noqa: F401
import subprocess

from xrpl.core.binarycodec.main import decode
from xrpld_publisher.utils import read_json, read_txt
from xrpld_publisher.models import Validator, VL, Blob


class PublisherClient(object):
    vl_path: str = ""
    manifest: str = ""
    vl: VL = None

    def __init__(cls, manifest: str = None, vl_path: str = None) -> None:
        if vl_path:
            try:
                cls.vl_path = vl_path
                vl_dict: Dict[str, Any] = read_json(vl_path)
                cls.vl = VL.from_json(vl_dict)
                cls.vl.blob.sequence += 1
                pass
            except Exception as e:
                raise e

        if manifest:
            cls.vl = VL()
            cls.vl.manifest = cls.manifest
            cls.vl.blob = Blob()
            cls.vl.blob.sequence = 1
            pass

    def add_validator(cls, manifest: str):
        if not cls.vl:
            raise ValueError("invalid vl")

        if not cls.vl.blob:
            raise ValueError("invalid blob")

        encoded = base64.b64decode(manifest).hex()
        decoded: Dict[str, Any] = decode(encoded)
        public_key: str = decoded["PublicKey"].upper()
        new_validator: Validator = Validator()
        new_validator.pk = public_key
        new_validator.manifest = manifest
        cls.vl.blob.validators.append(new_validator)

    def remove_validator(cls, public_key: str):
        if not cls.vl:
            raise ValueError("invalid VL")

        if not cls.vl.blob:
            raise ValueError("invalid Blob")

        validators = cls.vl.blob.validators
        # Find the validator with the specified public key
        for validator in validators:
            if validator.pk == public_key:
                validators.remove(validator)
                break
        else:
            raise ValueError("validator not found")

        cls.vl.blob.validators = validators

    def sign_unl(cls, pk: int, effective: int, expiration: int):
        if not cls.vl:
            raise ValueError("invalid vl")

        if len(cls.vl.blob.validators) == 0:
            raise ValueError("must have at least 1 validator")

        if not effective:
            effective: int = 0  # 01/01/2000

        if not expiration:
            expiration: int = 86400 * 30  # expires in 30 days

        out = open(cls.vl_path, "w")
        vl_manifests: List[str] = [v.manifest for v in cls.vl.blob.validators]
        args = [
            "../bin/validator-list",
            "sign",
            "--private_key",
            pk,
            "--sequence",
            str(cls.vl.blob.sequence),
            "--expiration",
            str(expiration),
            "--manifest",
            cls.vl.manifest,
            "--manifests",
            ",".join(vl_manifests),
        ]
        subprocess.call(args, stdout=out)
        return read_txt(vl_path)
