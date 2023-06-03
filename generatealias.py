import csv
from io import StringIO

def interpret_string(input_string, formatter):
    words = input_string.split(',')
    for word in words:
      print("[{}\"{}\"],".format(formatter,word))

def interpret_return(input_string):
    words = input_string.split('\n')
    for word in words:
      print("[{}=\"{}\"],".format(formatter,word))

# usage
interpret_string("pride,bi", "alt*=")

