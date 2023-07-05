#!/usr/bin/env python
# coding: utf-8

import json
import logging
from typing import Dict, Any, List  # noqa: F401

from testing_config import BaseTestConfig
from xrpld_publisher.publisher import (
    PublisherClient,
)

logger = logging.getLogger("app")


class TestPublisher(BaseTestConfig):
    name: str = "test"
    manifest: str = "JAAAAAFxIe101ANsZZGkvfnFTO+jm5lqXc5fhtEf2hh0SBzp1aHNwXMh7TN9+b62cZqTngaFYU5tbGpYHC8oYuI3G3vwj9OW2Z9gdkAnUjfY5zOEkhq31tU4338jcyUpVA5/VTsANFce7unDo+JeVoEhfuOb/Y8WA3Diu9XzuOD4U/ikfgf9SZOlOGcBcBJAw44PLjH+HUtEnwX45lIRmo0x5aINFMvZsBpE9QteSDBXKwYzLdnSW4e1bs21o+IILJIiIKU/+1Uxx0FRpQbMDA=="
    vl_path: str = "vl.json"

    def test_init(cls):
        client: PublisherClient = PublisherClient(vl_path=cls.vl_path)
        cls.assertIsNotNone(client.vl)
        cls.assertEqual(client.vl.blob.sequence, 2)

    def test_init_new_vl(cls):
        client: PublisherClient = PublisherClient(manifest=cls.manifest)
        cls.assertIsNotNone(client.vl)
        cls.assertEqual(client.vl.blob.sequence, 1)
        cls.assertEqual(len(client.vl.blob.validators), 0)

    def test_add_validator(cls):
        client: PublisherClient = PublisherClient(vl_path=cls.vl_path)
        cls.assertEqual(client.vl.blob.sequence, 2)
        add_manifest: str = "JAAAAAFxIe2hZPSzbC1zBGLV92K/ooCKpQkqvOzrsnCJUl0dBUvjO3MhA/ypR6fwixRkV775WvDPfDq/DQnNHcAgmfcYXDe7MoB1dkcwRQIhAN4eu1oHetlUCRffgaZy9/MbkCJkZQYvRh0UIeaBiVhvAiAhFYvJMpOyQi4lEw7s3JSU0LFnErDVVTg+sXQY4svmknASQBHk0jB0xmr/U0ny2j3kFeotBTTA1W7WppJmqobdxIy2GL4ApQhJOrnZG/wmvjxRB5uxcNE5GTGSYzD7k8aTLwo="
        client.add_validator(add_manifest)
        cls.assertEqual(len(client.vl.blob.validators), 3)
        cls.assertEqual(
            client.vl.blob.validators[0].pk,
            "ED11DC07A6DA3D07C012E19FF9AC67ACE539A295145C8DA396437CACAEC36709F6",
        )
        cls.assertEqual(
            client.vl.blob.validators[0].manifest,
            "JAAAAAFxIe0R3Aem2j0HwBLhn/msZ6zlOaKVFFyNo5ZDfKyuw2cJ9nMhAqtOO3xTpCZcUZUt2dLNKCkhnN1PVfY5aeOMXJEPPF8cdkcwRQIhANbPDfVKS7pIajz9N2QM4F8CxawWIratst2B7wedys1FAiBGK7/V0D4A2ZvTRDBUPoBKQXiBO7AEwrDb8Yo7dTI2SXASQOeA2+TgFVTp77e7uEdjX5MAbO2SKvvO39mO8ArBCjzdOPIqVb+Z/P02TNf365+b5B8g7WLDcLvVCieLczl80w0=",
        )

    def test_remove_validator(cls):
        client: PublisherClient = PublisherClient(vl_path=cls.vl_path)
        cls.assertEqual(client.vl.blob.sequence, 2)
        remove_pk: str = (
            "ED11DC07A6DA3D07C012E19FF9AC67ACE539A295145C8DA396437CACAEC36709F6"
        )
        client.remove_validator(remove_pk)
        cls.assertEqual(len(client.vl.blob.validators), 1)
