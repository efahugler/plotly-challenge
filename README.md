# plotly-challenge
## Plot.ly Homework - Belly Button Biodiversity
In this assignment, you will build an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

![image](https://user-images.githubusercontent.com/75512037/116839637-bc738c80-ab98-11eb-9d28-833de7a363b0.png)


### Step 1: Plotly


Use the D3 library to read in samples.json.


Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
![image](https://user-images.githubusercontent.com/75512037/116837638-de691100-ab90-11eb-8751-43d9e7c84bbd.png)




Use sample_values as the values for the bar chart.


Use otu_ids as the labels for the bar chart.


Use otu_labels as the hovertext for the chart.




Create a bubble chart that displays each sample.



Use otu_ids for the x values.


Use sample_values for the y values.


Use sample_values for the marker size.


Use otu_ids for the marker colors.


Use otu_labels for the text values.



![image](https://user-images.githubusercontent.com/75512037/116837645-e5901f00-ab90-11eb-9fd3-67f5dae6e21a.png)


Display the sample metadata, i.e., an individual's demographic information.


Display each key-value pair from the metadata JSON object somewhere on the page.

![image](https://user-images.githubusercontent.com/75512037/116837653-efb21d80-ab90-11eb-8db4-8061af570c60.png)



Update all of the plots any time that a new sample is selected.

Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown below:
![image](https://user-images.githubusercontent.com/75512037/116837679-140dfa00-ab91-11eb-89fe-5fb1411d3fbc.png)

### Hints
Use console.log inside of your JavaScript code to see what your data looks like at each step.
Refer to the Plotly.js documentation when building the plots.

### References 
Hulcr, J. et al.(2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/
https://plotly.com/javascript/


