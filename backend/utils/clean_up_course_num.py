import re

with open("course_num_clean.txt", "w") as w:
    with open("course_num.txt", "r") as f:
        course_num = re.findall('\((\d*)\)', f.read())
        res = ','.join(course_num)
        print(','.join(course_num))
        w.write(res)
