// Handle Header
$.get("/components/Header/header.html", function (data) {
	$("#header-placeholder").replaceWith(data);
	// Get active page
	let pathName = location.pathname.split("/");
	let hyperlink = `${pathName[1]}/${pathName[2]}/${pathName[3]}`;
	let navigationItem = $('.nav-item a[href="/' + hyperlink + '"]');
	navigationItem.append('<span class="sr-only">(current)</span>');
	navigationItem.parent().addClass("active");
});

if ($("#details-section")) {
	$.get("/data/Itineraries.json", function (itineraries) {
		let selectedItinerary = itineraries.find(
			(itinerary) => itinerary.id === localStorage.getItem("itineraryID")
		);
		if (selectedItinerary) {
			$("#title-placeholder").html(selectedItinerary.title);
			$("#summary-placeholder").html(
				`<div>${
					selectedItinerary.locations?.length
						? `<p><strong>Locations:</strong> ${selectedItinerary.locations.join(
								", "
						  )}</p>`
						: ""
				} ${
					selectedItinerary.duration
						? `<p><strong>Duration:</strong> ${selectedItinerary.duration}</p>`
						: ""
				}</div>`
			);
			$("#image-placeholder").html(
				`<img class="card-img-top img-fluid" src="${selectedItinerary.previewImage}" alt="${selectedItinerary.title}-image" />`
			);
			$("#days-placeholder").html(
				selectedItinerary.days
					.map(
						(day) =>
							`<div class="card">
                                 <h6 class="card-header">${day.title}</h6>
                                 <div class="card-body">
                                    <ul class="list-group list-group-flush">
                                       ${day.details
											.map(
												(detail) =>
													`<li class="list-group-item">${detail}</li>`
											)
											.join("")}
                                    </ul>
                                 </div>
                              </div>`
					)
					.join("")
			);
		}
	});
}

if ($("#itineraries-cards")) {
	$.get("/data/Itineraries.json", function (itineraries) {
		itineraries.forEach((itinerary) => {
			$("#itineraries-cards").append(
				`<div class="itinerary-card ${itinerary.type}">
               <div class="row h-100">
                  <div class="col-sm-6">
                     <img class="img-fluid" src="${
							itinerary.previewImage
						}" alt="${itinerary.title}-image" />
                  </div>
                  <div class="itinerary-content col-sm-6">
                     <div>
                        <h5>${itinerary.title}</h5>
                        ${
							itinerary.locations?.length
								? `<p class="text-truncate" title="${itinerary.locations.join(
										", "
								  )}"><strong>Locations:</strong> ${itinerary.locations.join(
										", "
								  )}</p>`
								: ""
						}
                        ${
							itinerary.duration
								? `<p><strong>Duration:</strong> ${itinerary.duration}</p>`
								: ""
						}
                     </div>
                     <div class="text-right">
                        <a class="itinerary-more-details" data-id="${
							itinerary.id
						}" href="#">More details</a>
                     </div>
                  </div>
               </div>
            </div>`
			);
		});
		$(".itinerary-more-details").click(function (event) {
			event.preventDefault(),
				localStorage.setItem("itineraryID", $(this).attr("data-id")),
				(window.location.href = "/Pages/Itineraries/details.html");
		});
		var $filterableGrid = $("#itineraries-cards").isotope({
			itemSelector: ".itinerary-card",
			filter: ".eight-days",
		});
		$(".filter-menu").on("click", "button", function () {
			var filterValue = $(this).attr("data-filter");
			$filterableGrid.isotope({ filter: filterValue });
		});
	});
}
