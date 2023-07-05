#!/usr/bin/env python
# coding: utf-8

from typing import Dict, Any # noqa: F401

from unittest import TestCase


class BaseTestConfig(TestCase):
    """BaseTestConfig."""

    @classmethod
    def setUpUnit(cls):
        """setUpUnit."""
        print('SETUP UNIT')

    @classmethod
    def setUpIntegration(cls):
        """setUpIntegration."""
        print('SETUP INTEGRATION')

    @classmethod
    def tearDownIntegration(cls):
        """tearDownIntegration."""
        print('TEAR DOWN INTEGRATION')

    @classmethod
    def setUpClass(cls):
        """setUpClass."""
        print('SETUP CLASS')

    @classmethod
    def tearDownClass(cls):
        """tearDownClass."""
        print('TEAR DOWN CLASS')

    def setUp(cls):
        """setUp."""
        print('SETUP APP')
        cls.setUpUnit()

    def tearDown(cls):
        """tearDown."""
        print('TEAR DOWN')
        # print(ee)
