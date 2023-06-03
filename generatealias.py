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
# for guild icons
# interpret_string("icons/267624335836053506,icons/154305477323390976", "src*=")
# interpret_string("icons/267624335836053506,icons/154305477323390976", "style*=")

#todo: crawler to grab guilds(users) with tags on disboard
