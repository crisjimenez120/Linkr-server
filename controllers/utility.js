function MergeIntervals (events) {
	let merged = [];
	events = BubbleSort(events);
	for (let i = 0; i < events.size(); i++) {
		if (merged.size() != 0 && merged[merged.size()-1].end >= events[i].start) {
			
			let maxEnd = MaxDate(d1, d2, merged[merged.size()-1].start, events[i].start);
			let merge = {title: "merged event", start: merged[merged.size()-1].start, end: maxEnd};
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

function MaxDate (date1, date2) {
	let d1 = new Date(date1);
	let d2 = new Date(date2);
	return dates.compare(d1, d2) >= 0 ? date1 : date2;
}

function Swap (array, i, j) {
	let tmp = array[i];
	array[i] = array[j];
	array[j] = tmp;
}

/*
Swap: function (array, i, j) {
		let tmp = array[i];
		array[i] = array[j];
		array[j] = tmp;
	},
	MaxDate: function (date1, date2) {
		let d1 = new Date(date1);
		let d2 = new Date(date2);
		return dates.compare(d1, d2) >= 0 ? date1 : date2;
	},
	BubbleSort: function (array) {  
	   for (let i = 0; i < array.size()-1; i++)       
	       // Last i elements are already in place    
	       for (let j = 0; j < array.size()-i-1; j++)  
	           if (array[j] > array[j+1]) 
	              Swap(array[j], array[j+1]);
		return array; 
	},
	MergeIntervals: function (events) {
		let merged = [];
		console.log (merged);
		events = BubbleSort(events);
		console.log(events);
		for (let i = 0; i < events.size(); i++) {
			if (merged.size() != 0 && merged[merged.size()-1].end >= events[i].start) {
				
				let maxEnd = MaxDate(d1, d2, merged[merged.size()-1].start, events[i].start);
				let merge = {title: "merged event", start: merged[merged.size()-1].start, end: maxEnd};
				merged[merged.size()-1].end = merge;
			} else // no overlap
				merged.add(events[i]);
		}
		return merged;
	}
*/