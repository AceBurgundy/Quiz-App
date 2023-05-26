import os

def process_directory(directory, file):
    for root, _, files in os.walk(directory):
        for filename in files:
            if filename.endswith(('.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.woff', '.woff2', '.ttf', '.css')):
                continue
            if filename in ['.git', '.gitignore', 'xrawler.py']:
                continue
            filepath = os.path.join(root, filename)
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                file.write('------------------File------------------\n')  # Add this line
                file.write(filename + '\n\n')
                file.write(f.read())
                file.write('\n\n')

def create_data_file(directory, file):
    file.write('----------------------------------Folder name----------------------------------\n\n')
    process_directory(directory, file)
    file.write('\n')

def crawl_directory(directory, file):
    for root, dirs, _ in os.walk(directory):
        if root != directory:
            foldername = os.path.basename(root)
            file.write('----------------------------------' + foldername + '----------------------------------\n\n')
        for dirname in dirs:
            process_directory(os.path.join(root, dirname), file)

def main(filename):
    directory = os.getcwd()  # Get the current working directory
    with open(filename, 'w', encoding='utf-8') as file:
        create_data_file(directory, file)
        crawl_directory(directory, file)

# Specify the filename to create
filename = 'data.txt'

# Call the main function
main(filename)
