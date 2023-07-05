#!/usr/bin/env python
# coding: utf-8

from typing import Dict, Any, List  # noqa: F401

from xrpld_publisher.utils import decode_blob, encode_blob


class Validator(object):
    pk: str = None
    manifest: str = None

    def __init__(self) -> None:
        pass

    @staticmethod
    def from_json(json: Dict[str, Any]):
        self = Validator()
        self.pk = json["validation_public_key"]
        self.manifest = json["manifest"]
        return self

    def to_dict(self):
        return {
            "validation_public_key": self.pk,
            "manifest": self.manifest,
        }


class Blob(object):
    sequence: int = None
    effective: str = None
    expiration: str = None
    validators: List[Validator] = []

    def __init__(self) -> None:
        pass

    @staticmethod
    def from_json(json: Dict[str, Any]):
        self = Blob()
        self.sequence = json["sequence"]
        # self.effective = json['effective']
        self.expiration = json["expiration"]
        self.validators = [Validator.from_json(v) for v in json["validators"]]
        return self

    def to_dict(self):
        return {
            "sequence": self.sequence,
            # "effective": self.effective,
            "expiration": self.expiration,
            "validators": [v.to_dict() for v in self.validators],
        }


class VL(object):
    public_key: str = None
    manifest: str = None
    blob: Blob = None
    signature: str = None
    version: int = None

    def __init__(self) -> None:
        pass

    @staticmethod
    def from_json(json: Dict[str, Any]):
        self = VL()
        # self.public_key = json['public_key']
        self.manifest = json["manifest"]
        self.blob = Blob.from_json(decode_blob(json["blob"]))
        self.signature = json["signature"]
        self.version = json["version"]
        return self

    def to_dict(self):
        return {
            "public_key": self.public_key,
            "manifest": self.manifest,
            "blob": encode_blob(self.blob.to_dict()).decode("utf-8"),
            "signature": self.signature,
            "version": self.version,
        }
