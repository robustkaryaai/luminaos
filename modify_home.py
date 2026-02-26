import re

file_path = '/Volumes/My Disk (SSD)/rk-full/LUMINAOS/components/Home.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Imports
content = content.replace("import CustomCursor from './CustomCursor';", "import CustomCursor from './CustomCursor';\nimport Draggable from 'react-draggable';")

# Replace CereboNex / CerebroNex
content = re.sub(r'CerebroNex', 'RK AI', content, flags=re.IGNORECASE)
content = re.sub(r'CereboNex', 'RK AI', content, flags=re.IGNORECASE)

# Wrap apps in Draggable
# We will match the specific start tags and their corresponding end tags by finding them in order.
# Using a simple block replacement strategy since they are sequential.

apps = [
    {
        'find_start': '<div id="result" className={styles.result}>',
        'replace_start': '<Draggable handle="#result">\n<div id="result" className={styles.result}>',
        'find_end': '</div>\n                <div className={styles.Apps} id="AllApps">',
        'replace_end': '</div>\n</Draggable>\n                <div className={styles.Apps} id="AllApps">'
    },
    {
        'find_start': '<div id="LumiNexplorer" className={styles.App}>',
        'replace_start': '<Draggable handle={`.${styles.top}`}>\n<div id="LumiNexplorer" className={styles.App}>',
        'find_end': '</div>\n                    </div>\n                    <div id="Clock" className={styles.App}>',
        'replace_end': '</div>\n                    </div>\n</Draggable>\n                    <div id="Clock" className={styles.App}>'
    },
    {
        'find_start': '<div id="Clock" className={styles.App}>',
        'replace_start': '<Draggable handle={`.${styles.top}`}>\n<div id="Clock" className={styles.App}>',
        'find_end': '</div>\n                        </div>\n                    </div>\n                    <div id="Browser" className={styles.App}>',
        'replace_end': '</div>\n                        </div>\n                    </div>\n</Draggable>\n                    <div id="Browser" className={styles.App}>'
    },
    {
        'find_start': '<div id="Browser" className={styles.App}>',
        'replace_start': '<Draggable handle={`.${styles.BroTop}`}>\n<div id="Browser" className={styles.App}>',
        'find_end': '</div>\n                        </div>\n                    </div>\n                    <div id="WhatsApp" className={styles.App}>',
        'replace_end': '</div>\n                        </div>\n                    </div>\n</Draggable>\n                    <div id="WhatsApp" className={styles.App}>'
    },
    {
        'find_start': '<div id="WhatsApp" className={styles.App}>',
        'replace_start': '<Draggable handle={`.${styles.BroTop}`}>\n<div id="WhatsApp" className={styles.App}>',
        'find_end': '</div>\n                        </div>\n                    </div>\n                    <div id="Calculator" className={styles.App}>',
        'replace_end': '</div>\n                        </div>\n                    </div>\n</Draggable>\n                    <div id="Calculator" className={styles.App}>'
    },
    {
        'find_start': '<div id="Calculator" className={styles.App}>',
        'replace_start': '<Draggable handle={`.${styles.top}`}>\n<div id="Calculator" className={styles.App}>',
        'find_end': '</div>\n                            </div>\n                        </div>\n                    </div>\n                    <div id="Store" className={styles.StoreApp}',
        'replace_end': '</div>\n                            </div>\n                        </div>\n                    </div>\n</Draggable>\n                    <div id="Store" className={styles.StoreApp}'
    },
    {
        'find_start': ' className={styles.StoreMainWindow}>\n                                {luminaApps.map((app, index) => (\n                                    <div key={index} className={styles.application}>\n                                        {app.icon}\n                                        <span>{app.name}</span>\n                                        <button className={styles.appDownload}><AiOutlineDownload /></button>\n                                    </div>\n                                ))}\n                            </div>\n                        </div>\n                    </div>\n                    <div id="Settings" className={styles.App}>',
        'replace_start': ' className={styles.StoreMainWindow}>\n                                {luminaApps.map((app, index) => (\n                                    <div key={index} className={styles.application}>\n                                        {app.icon}\n                                        <span>{app.name}</span>\n                                        <button className={styles.appDownload}><AiOutlineDownload /></button>\n                                    </div>\n                                ))}\n                            </div>\n                        </div>\n                    </div>\n</Draggable>\n                    <div id="Settings" className={styles.App}>',
    },
    {
        'find_start': '<div id="Store" className={styles.StoreApp} style={{ position: \'absolute\', top: storePosition.y, left: storePosition.x }}>',
        'replace_start': '<Draggable handle={`.${styles.top}`}>\n<div id="Store" className={styles.StoreApp} style={{ position: \'absolute\', top: storePosition.y, left: storePosition.x }}>',
        'find_end': 'None',
        'replace_end': 'None'
    },
    {
        'find_start': '<div id="Settings" className={styles.App}>',
        'replace_start': '<Draggable handle={`.${styles.top}`}>\n<div id="Settings" className={styles.App}>',
        'find_end': '</div>\n                            </div>\n                        </div>\n                    </div>\n                    <div id="Chat" className={styles.App}>',
        'replace_end': '</div>\n                            </div>\n                        </div>\n                    </div>\n</Draggable>\n                    <div id="Chat" className={styles.App}>'
    },
    {
        'find_start': '<div id="Chat" className={styles.App}>',
        'replace_start': '<Draggable handle={`.${styles.top}`}>\n<div id="Chat" className={styles.App}>',
        'find_end': '</div>\n                        </div>\n                    </div>\n                    <div id="Weather" className={styles.App}>',
        'replace_end': '</div>\n                        </div>\n                    </div>\n</Draggable>\n                    <div id="Weather" className={styles.App}>'
    },
    {
        'find_start': '<div id="Weather" className={styles.App}>',
        'replace_start': '<Draggable handle={`.${styles.top}`}>\n<div id="Weather" className={styles.App}>',
        'find_end': '</div>\n                                )}\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                {dropdown',
        'replace_end': '</div>\n                                )}\n                            </div>\n                        </div>\n                    </div>\n</Draggable>\n                </div>\n                {dropdown'
    }
]

for app_mod in apps:
    if app_mod['find_start'] in content:
        content = content.replace(app_mod['find_start'], app_mod['replace_start'], 1)
    if 'find_end' in app_mod and app_mod['find_end'] != 'None' and app_mod['find_end'] in content:
        content = content.replace(app_mod['find_end'], app_mod['replace_end'], 1)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Draggable added and text replaced.")
