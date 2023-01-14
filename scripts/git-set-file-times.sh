#!/usr/bin/bash

for FILE in `git ls-files`; do
  COMMIT_TIME=`git -c diff.renames=false log -m -r --no-color --pretty=format:%ci -z -n1 $FILE`
  echo -e "$COMMIT_TIME\t$FILE"
  TIMESTAMP=`date -d "$COMMIT_TIME" +"%y%m%d%H%M.%S"`
  touch -t $TIMESTAMP $FILE
done
