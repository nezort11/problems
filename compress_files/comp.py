import os  # unix system interface (shell/filesystem)
import sys  # python interpreter interface
from zipfile import ZipFile  # python interface for zlib
from pathlib import Path  # os.path filesystem path replacement
from datetime import datetime


def main():
    # Get file paths
    filepaths = sys.argv[1:]

    backup_path = Path(datetime.now().strftime('%Y/%m/%d/'))
    if not backup_path.exists():
        os.makedirs(backup_path)

    # Compress all given files
    for fp in filepaths:
        filepath = Path(fp)
        if filepath.is_file():
            # # 1. Create .zip near file
            # zippath = filepath.with_suffix('.zip')
            # with ZipFile(zippath, mode='w') as z:
            #     z.write(filepath)

            # 2. Create .zip for every file in datetime directories
            filename = filepath.stem
            zippath = backup_path / f'{filename}.zip'
            with ZipFile(zippath, mode='w') as z:
                z.write(filepath)


if __name__ == '__main__':
    main()
