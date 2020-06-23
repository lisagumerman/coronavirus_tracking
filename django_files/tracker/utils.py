driver_path = '/Users/lisagumerman/Development/chromedriver'


def output(self, string):
    self.stdout.write(self.style.SUCCESS(string))


def to_num(value):
    return int(value.replace(',', ''))
