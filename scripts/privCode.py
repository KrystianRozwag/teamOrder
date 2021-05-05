import string, random
def get_privKey(teamName):
    letters = string.ascii_letters + string.digits
    result_privKey = teamName+'#'+''.join(random.choice(letters) for i in range(5))
    return result_privKey