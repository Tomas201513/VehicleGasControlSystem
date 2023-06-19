# #!/bin/bash

# # Define the search pattern as a regular expression
# pattern="^(import { Helmet } from \"react-helmet-async\";|<Helmet title=\"Login\" \/>).*$"

# # Find all .js files in the current directory and its subdirectories
# files=$(find . -type f -name "*.js")

# # Iterate over each file and remove any lines that match the pattern
# for file in $files; do
#     sed -i "/$pattern/d" "$file"
# done