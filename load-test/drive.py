#!/usr/bin/python3

from selenium import webdriver
from selenium.common import exceptions
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

class Driver:
    def __init__(self):
        options = webdriver.ChromeOptions();
        options.add_argument("--start-maximized");
        service = Service('/usr/lib/chromium-browser/chromedriver')
        self.br = webdriver.Chrome(service=service, options=options)

    def run(self):
        self.br.execute_script('window.open("http://localhost:3000/develop/be088224fb37c0075e84491da0e602c1", "_blank");')

    def close(self):
        self.br.close()


def main():
    drivers = []
    for i in range(2):
        driver = Driver()
        driver.run()
        drivers.append(driver)

    time.sleep(60)

    for driver in drivers:
        driver.close()


if __name__ == "__main__":
    main()
