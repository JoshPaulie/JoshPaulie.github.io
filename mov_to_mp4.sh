#!/bin/bash

# Batch mov -> mp4 converter

set -euo pipefail
IFS=$'\n\t'

# Validate input
if [[ $# -ne 1 ]]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

input_dir=$1

if [[ ! -d "$input_dir" ]]; then
    echo "Error: Directory '$input_dir' does not exist"
    exit 1
fi

# Process .mov files
find "$input_dir" -type f -name '*.mov' | while read -r input_file; do
    output_file="${input_file%.mov}.mp4"
    echo "Converting: '$input_file' -> '$output_file'"

    ffmpeg -hide_banner -loglevel error -nostdin \
        -i "$input_file" \
        -c:v libx264 -crf 23 -preset medium \
        -vf scale=1280:-2 \
        -c:a aac -b:a 128k \
        -threads 0 \
        "$output_file"
done
