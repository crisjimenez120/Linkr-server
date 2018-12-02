function MergeIntervals (events) {
	let merged = [];
	events = BubbleSort(events);
	for (let i = 0; i < events.size(); i++) {
		if (merged.size() != 0 && merged[merged.size()-1].end >= events[i].start) {
			let merge = {title: "merged", start: events[i-1].start, end: MaxEnd (array, i, j)};
			merged[merged.size()-1].end = merge;
		} else // no overlap
			merged.add(events[i]);
	}
}

function BubbleSort(array) {  
   for (let i = 0; i < array.size()-1; i++)       
       // Last i elements are already in place    
       for (let j = 0; j < array.size()-i-1; j++)  
           if (array[j] > array[j+1]) 
              Swap(array[j], array[j+1]);
	return array; 
}

function MaxEnd (array, i, j) {
	let x = array[i];
	let y = array[j];
	return x.end >= y.end ? x.end : y.end;
}

function Swap (array, i, j) {
	let tmp = array[i];
	array[i] = array[j];
	array[j] = tmp;
}