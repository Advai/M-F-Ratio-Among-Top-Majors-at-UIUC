
# Male to Female Ratio Visualization
We choose to make a slope graph of the Male to Female Ratio for selected majors within 4 colleges inside UIUC. We chose this type of graph because it shows the change in gender ratio over a large period of time rather than every year which makes for a less aesthetic visualization (in my opinion)

## Data Cleaning Process
1. Grouped data by college then year. 
2. Filtered data for our selected majors within each college. Our criteria for majors was size and how well known it is (ie everyone knows mathematics is a major but not everyone knows the Agricultural Communications major. For our own ease, we selected the start year as 2004 because many majors were moved into different colleges in the years prior and 2004 is the year that Computer Science was moved from College of Business to College of Engineering. 
3. Fill all N/A values with 0
4. We calculated the M/F Ratio and wrote the DataFrame for each college to its respective csv. We opted for individual files for each college for ease of loading into d3 as pandas is much MUCH easier to use than javascript.

## Running the project
1. After cloning the repo, go to the working directory for this project. 
2. Run python -m http.server
3. Go to http://127.0.0.1:8000 and enjoy!
