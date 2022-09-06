import datetime
from itertools import count
import json
from pickle import TRUE
from sre_constants import SUCCESS
import requests
import json
from termcolor import colored
import os
import platform
platform = platform.system()
if platform == 'Darwin':  # for Unix (MacOS, Linux)
    text = "clear"
elif platform == 'Windows':  # for Windows
    text = 'cls'


################################################
#################SETTING########################
LOCALHOST = "http://localhost:8080/"

SUCCESS_RESPONSE = False
DEBUG = False
directory = 'mockdata'
TEST_DELETE = True
EXPORT_RESPONSE = False


# All the files to read in Order
OrderTest = [
    ".POSTCreateBankNames.json",
    ".POSTCreateTag.json",
    ".POSTCreateSupportType.json",
    '.POSTCreatePaymentType.json',
    ".POSTCreatePickUpTimeTag.json",
    ".POSTCreateStatus.json",
    ".POSTCreateCoupon.json",

    ".POSTCreateUser.json",
    ".POSTCreateStoreOwner.json",
    ".POSTCreateStore.json",

    ".POSTCreateBankAccount.json",
    ".POSTCreateProduct.json",
    ".POSTCreateFavTableRelation.json",
    ".POSTCreateOrder.json",
    ".POSTCreateReview.json",
    ".POSTCreateStoreTag.json",
    ".POSTCreateProductTag.json",
    ".POSTCreateTicketSupport.json",
    ".POSTCreateCouponUser.json",

    "#GETTSearchFilter.json",
    "#GETTAllStore.json",
    "#GETTStoreHistory.json",
    "#GETTUserHistory.json",


    "DELETE-BankAccount.json",
    "DELETE-PickUpTimeTag.json",
    "PUTTEditStore.json",
    "PUTTEditProduct.json"
]


################################################
################################################


def clear():
    os.system(text)


class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


def resetWhiteTerminal():
    print(colored("", "white"))
    ".POST.json"
    "#GET.json"


def LeftOverFiles():  # get list of leftover directory
    l = []
    for filename in os.listdir(directory):
        if filename not in OrderTest:
            l.append(filename)
    if l == ["mockdatagen.py",
             "template.json", ]:
        pass
    else:
        for i in l:
            print(f'"{i}",')


def testGYRBrain(filename, requrl, jsonfile, outstring):
    if filename[:5] == ".POST":
        # print(json.dumps(i, indent=4, sort_keys=True))
        r = requests.post(LOCALHOST + requrl, json=jsonfile)
    elif filename[:5] == "#GETT":
        r = requests.get(LOCALHOST + requrl, json=jsonfile)
    elif filename[:6] == "DELETE" and TEST_DELETE:
        r = requests.delete(LOCALHOST + requrl, json=jsonfile)
    elif filename[:4] == "PUTT":
        r = requests.put(LOCALHOST + requrl, json=jsonfile)
    if DEBUG:
        if str(r.status_code)[0] == "2":
            if SUCCESS_RESPONSE:
                response = {r._content}
            else:
                response = ""
            print(bcolors.OKGREEN + f"""{outstring} 
        Success. Status Code: {str(r.status_code)}"""
                  + bcolors.OKGREEN + str(response) + (colored("", "white")))
        elif r.status_code == 409:
            print(bcolors.WARNING + f"""    Conflict
        Status Code: {str(r.status_code)}"""
                  + bcolors.WARNING + (colored("", "white")))
        else:
            r._content = r._content.decode('utf-8')
            # {json.dumps(r.json(), indent=4)}
            print(bcolors.FAIL + f"""   Fail
        Status Code: {str(r.status_code)}

        Response:
        {r._content}
        """


                  )
        print(colored("", "white"))
    else:
        if str(r.status_code)[0] == "2":
            if SUCCESS_RESPONSE:
                response = {r._content}
            else:
                response = ""
            print(bcolors.OKGREEN +
                  f"""{outstring}: {str(r.status_code)} ✓✓{(colored("", "white"))}""")
        elif r.status_code == 409:
            print(bcolors.WARNING +
                  f"""{outstring}: {str(r.status_code)}~~{(colored("", "white"))}""")
        else:
            r._content = r._content.decode('utf-8')
            # {json.dumps(r.json(), indent=4)}
            print(bcolors.FAIL +
                  f"""{outstring}: {str(r.status_code)}
        Response:
        {r._content}
        {(colored("", "white"))}""")
    #r._content = r._content.decode('utf-8')

    filename_export = os.path.join(
        rootdir, filename[:-5]+"-"+str(counter) + ".json")
    if EXPORT_RESPONSE:
        with open(filename_export, "w") as f:
            if type(r.content) != json or dict:
                fcontent = {"status": "empty"}
            else:
                fcontent = r.content
            #print('HOLYFUCKINGSHIT', repr(r.content))
            out = dict({
                "filename": filename+"-"+str(counter),
                "url": "meella.org/"+requrl,
                "request":
                jsonfile,
                "response":
                fcontent
            })
            # print(out)

            out_json = json.dumps(out, indent=4)
            f.write(out_json)


def testGYR():
    from datetime import datetime
    now = datetime.now()
    global dateSession, counter, rootdir
    dateSession = now.strftime("%d.%m.%Y-%H.%M.%S")
    rootdir = "mockdata/"+str(f"Example-ReqRes-{dateSession}")
    if EXPORT_RESPONSE:
        os.mkdir(rootdir)
    for filename in OrderTest:
        counter = 0
        print(colored("__"*5+filename+"__"*5, "blue"))
        print(colored("__"*30, "blue"))
        if filename.endswith(".json"):
            f = os.path.join(directory, filename)
            # checking if it is a file
            """ if os.path.isfile(f):
                print(f) """
            with open(f, 'r', encoding='utf-8') as file:
                # print("BAA", file)
                data = json.load(file)

                for k in list(data.keys()):
                    for i in list(data.values())[0]:
                        """ text = str(i)
                        text.replace("'",'"') """

                        testGYRBrain(filename, k, i,
                                     f"{list(data.keys())[0]}  {counter}")
                        counter += 1


def main():
    clear()
    LeftOverFiles()  # get list of leftover directory
    testGYR()


if __name__ == "__main__":
    main()
