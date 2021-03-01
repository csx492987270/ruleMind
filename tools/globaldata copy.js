let mainFn = {
    'Rbc_assert': ['int cond', 'const char* rule_name'],
    'Model_decl': ['int ret'],
}
let apiObj = {
    'Set_tag': ['void* obj', 'char* tag'],
    'Or_tag': ['void* obj', 'char* tag'],
    'Copy_tag': ['void* tgt', 'void* src'],
    'Eval_tag': ['void* tgt', 'void* src'],
    'Set_tag_attr': ['void* tgt', 'void* src', 'const char* tag', 'const char* tag_attr'],
    'Is_tag_attr_set': ['void* v', 'const char* tag', 'const char* tag_attr'],
}
let strObj = {
    'tag': ['tainted', 'sensitive'],
    'tag_attr': ["sanitize_sql", "sanitize_xss", "sanitize_cmdi", "sanitize_path", "sanitize_session", "sanitize_xpath", "sanitize_cookie", "sanitize_fmt_string"]
}
let objAttr = {
    'Get_arg(N)': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    'Get_this_pointer()': 'Get_this_pointer()',
    'Get_ret()': 'Get_ret()'
}
let rulesList = {
    "Rule 00": [
        "IDS00-J",
        "IDS01-J",
        "IDS02-J",
        "IDS03-J",
        "IDS04-J",
        "IDS05-J",
        "IDS06-J",
        "IDS07-J",
        "IDS08-J",
        "IDS09-J",
        "IDS10-J",
        "IDS11-J",
        "IDS12-J",
        "IDS13-J",
        "IDS14-J",
        "IDS15-J",
        "IDS16-J",
        "IDS17-J"
    ],
    "Rule 01": [
        "DCL00-J",
        "DCL01-J",
        "DCL02-J"
    ],
    "Rule 02": [
        "EXP00-J",
        "EXP01-J",
        "EXP02-J",
        "EXP03-J",
        "EXP04-J",
        "EXP05-J",
        "EXP06-J",
        "EXP07-J"
    ],
    "Rule 03": [
        "NUM00-J",
        "NUM01-J",
        "NUM02-J",
        "NUM03-J",
        "NUM04-J",
        "NUM05-J",
        "NUM06-J",
        "NUM07-J",
        "NUM08-J",
        "NUM09-J",
        "NUM10-J",
        "NUM11-J",
        "NUM12-J",
        "NUM13-J",
        "NUM14-J"
    ],
    "Rule 04": [
        "STR00-J",
        "STR01-J",
        "STR02-J",
        "STR03-J",
        "STR04-J"
    ],
    "Rule 05": [
        "OBJ00-J",
        "OBJ01-J",
        "OBJ02-J",
        "OBJ03-J",
        "OBJ04-J",
        "OBJ05-J",
        "OBJ06-J",
        "OBJ07-J",
        "OBJ08-J",
        "OBJ09-J",
        "OBJ10-J",
        "OBJ11-J",
        "OBJ12-J",
        "OBJ13-J",
        "OBJ14-J"
    ],
    "Rule 06": [
        "MET00-J",
        "MET01-J",
        "MET02-J",
        "MET03-J",
        "MET04-J",
        "MET05-J",
        "MET06-J",
        "MET07-J",
        "MET08-J",
        "MET09-J",
        "MET10-J",
        "MET11-J",
        "MET12-J",
        "MET13-J"
    ],
    "Rule 07": [
        "ERR00-J",
        "ERR01-J",
        "ERR02-J",
        "ERR03-J",
        "ERR04-J",
        "ERR05-J",
        "ERR06-J",
        "ERR07-J",
        "ERR08-J",
        "ERR09-J"
    ],
    "Rule 08": [
        "VNA00-J",
        "VNA01-J",
        "VNA02-J",
        "VNA03-J",
        "VNA04-J",
        "VNA05-J"
    ],
    "Rule 09": [
        "LCK00-J",
        "LCK01-J",
        "LCK02-J",
        "LCK03-J",
        "LCK04-J",
        "LCK05-J",
        "LCK06-J",
        "LCK07-J",
        "LCK08-J",
        "LCK09-J",
        "LCK10-J",
        "LCK11-J"
    ],
    "Rule 10": [
        "THI00-J",
        "THI01-J",
        "THI02-J",
        "THI03-J",
        "THI04-J",
        "THI05-J"
    ],
    "Rule 11": [
        "TPS00-J",
        "TPS01-J",
        "TPS02-J",
        "TPS03-J",
        "TPS04-J"
    ],
    "Rule 12": [
        "TSM00-J",
        "TSM01-J",
        "TSM02-J",
        "TSM03-J"
    ],
    "Rule 13": [
        "FIO00-J",
        "FIO01-J",
        "FIO02-J",
        "FIO03-J",
        "FIO04-J",
        "FIO05-J",
        "FIO06-J",
        "FIO07-J",
        "FIO08-J",
        "FIO09-J",
        "FIO10-J",
        "FIO11-J",
        "FIO12-J",
        "FIO13-J",
        "FIO14-J",
        "FIO15-J",
        "FIO16-J"
    ],
    "Rule 14": [
        "SER00-J",
        "SER01-J",
        "SER02-J",
        "SER03-J",
        "SER04-J",
        "SER05-J",
        "SER06-J",
        "SER07-J",
        "SER08-J",
        "SER09-J",
        "SER10-J",
        "SER11-J",
        "SER12-J",
        "SER13-J"
    ],
    "Rule 15": [
        "SEC00-J",
        "SEC01-J",
        "SEC02-J",
        "SEC03-J",
        "SEC04-J",
        "SEC05-J",
        "SEC06-J",
        "SEC07-J"
    ],
    "Rule 16": [
        "ENV00-J",
        "ENV01-J",
        "ENV02-J",
        "ENV03-J",
        "ENV04-J",
        "ENV05-J",
        "ENV06-J"
    ],
    "Rule 17": [
        "JNI00-J",
        "JNI01-J",
        "JNI02-J",
        "JNI03-J",
        "JNI04-J"
    ],
    "Rule 49": [
        "MSC00-J",
        "MSC01-J",
        "MSC02-J",
        "MSC03-J",
        "MSC04-J",
        "MSC05-J",
        "MSC06-J",
        "MSC07-J",
        "MSC08-J",
        "MSC09-J",
        "MSC10-J",
        "MSC11-J"
    ],
    "OWASP": [
        "A1:2017 - 注入",
        "A2:2017 - 失效的身份认证",
        "A3:2017 - 敏感信息泄露",
        "A4:2017 - XML 外部实体（XXE）",
        "A5:2017- 失效的访问控制",
        "A6:2017 - 安全配置错误",
        "A7:2017 - 跨站脚本（XSS）",
        "A8:2017 - 不安全的反序列化",
        "A9:2017 - 使用含有已知漏洞的组件 ",
        "A10:2017 - 不足的日志记录和监控"
    ]
}