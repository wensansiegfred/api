$(document).ready(function(){
	loadAllUsers();

	$(".add-user").click(function(){
		$("#user-modal").modal("show").fadeIn();
		$('#birthdate').datepicker({
		    format: 'yyyy-mm-dd',
		    startDate: '-3d'
		});
		$(".save-user").click(function(){
			saveUser();
		});
		$("#user-modal").find("input").val("");
	});

	$(".search-user").click(function(){
		var name = $("#search-name").val();
		$.ajax({
			url: "../api/public/user",
			data: {name: name},
			dataType: 'json',
			method: "GET",
			success: function(data){
				$("#users-table").find("tbody").html("");		
				if(data.count > 0){
					var tbody = "";				
					for(var index in data.result){					
						tbody += "<tr _id='" + data.result[index].id + "'>";
						tbody += "<td>" + data.result[index].id + "</td>"; 
						tbody += "<td>" + data.result[index].username + "</td>";
						tbody += "<td>" + data.result[index].firstname + "</td>";
						tbody += "<td>" + data.result[index].lastname + "</td>";
						tbody += "<td>" + data.result[index].birthdate + "</td>";
						tbody += "<td>" + data.result[index].gender + "</td>";
						tbody += "<td><button type=\"button\" class=\"btn btn-primary btn-sm update-user\">update</button>&nbsp;&nbsp;<button type=\"button\" class=\"btn btn-primary btn-sm delete-user\">delete</button></td>";					
						tbody += "</tr>";
					}
					$("#users-table").find("tbody").append(tbody);
					$(".update-user").click(function(){
						var id = $(this).closest("tr").attr("_id");
						updateUser(id);
					});
					$(".delete-user").click(function(){
						var id = $(this).closest("tr").attr("_id");
						deleteUser(id);
					});
				}else{
					$("#users-table").find("tbody").html("");	
				}	
			},
			error: function(err){
				console.log(err);
			}
		});
	});
});

function saveUser(){	
	var data = {
		username: $("#username").val(),
		firstname: $("#firstname").val(),
		lastname: $("#lastname").val(),
		gender: $("#gender").val(),
		birthdate: $("#birthdate").val()
	}
	$.ajax({
		url: "../api/public/user",
		data: data,
		dataType: 'json',
		method: "POST",
		success: function(data){
			loadAllUsers();
			$("#user-modal").modal("hide").fadeOut();
		},
		error: function(err){
			console.log(err);
		}
	});
}

function loadAllUsers(){
	$.ajax({
		url: "../api/public/user",
		data: {},
		dataType: 'json',
		method: "GET",
		success: function(data){
			$("#users-table").find("tbody").html("");		
			if(data.count > 0){
				var tbody = "";				
				for(var index in data.result){					
					tbody += "<tr _id='" + data.result[index].id + "'>";
					tbody += "<td>" + data.result[index].id + "</td>"; 
					tbody += "<td>" + data.result[index].username + "</td>";
					tbody += "<td>" + data.result[index].firstname + "</td>";
					tbody += "<td>" + data.result[index].lastname + "</td>";
					tbody += "<td>" + data.result[index].birthdate + "</td>";
					tbody += "<td>" + data.result[index].gender + "</td>";
					tbody += "<td><button type=\"button\" class=\"btn btn-primary btn-sm update-user\">update</button>&nbsp;&nbsp;<button type=\"button\" class=\"btn btn-primary btn-sm delete-user\">delete</button></td>";					
					tbody += "</tr>";
				}
				$("#users-table").find("tbody").append(tbody);
				$(".update-user").click(function(){
					var id = $(this).closest("tr").attr("_id");
					updateUser(id);
				});
				$(".delete-user").click(function(){
					var id = $(this).closest("tr").attr("_id");
					deleteUser(id);
				});
			}
		},
		error: function(err){
			console.log(err);
		}
	});
}

function deleteUser(id){
	$.ajax({
		url: "../api/public/user/index/userid/" + id,
		data: {},
		dataType: 'json',
		method: "DELETE",
		success: function(data){
			loadAllUsers();
		},
		error: function(err){
			console.log(err);
		}
	});	
}

function updateUser(id){
	$("#update-modal").modal("show").fadeIn();
	$("#update-modal").find("input").val("");
	$.ajax({
		url: "../api/public/user",
		data: {id: id},
		dataType: 'json',
		method: "GET",
		success: function(data){
			if(data.count > 0){
				
				$("#update-modal").attr("_id", data.result[0].id);
				$("#update-modal").find("input#username").val(data.result[0].username);
				$("#update-modal").find("input#firstname").val(data.result[0].firstname);
				$("#update-modal").find("input#lastname").val(data.result[0].lastname);
				$("#update-modal").find("input#birthdate").val(data.result[0].birthdate);
				$("#update-modal").find("input#gender").val(data.result[0].gender);
			}
			$(".save-update-user").click(function(){
				saveUpdateUser(id);	
			});	
		},
		error: function(err){
			console.log(err);
		}
	});	
}

function saveUpdateUser(id){
	var data = {		
		username: $("#update-modal").find("input#username").val(),
		firstname: $("#update-modal").find("input#firstname").val(),
		lastname: $("#update-modal").find("input#lastname").val(),
		gender: $("#update-modal").find("input#gender").val(),
		birthdate: $("#update-modal").find("input#birthdate").val()
	}
	$.ajax({
		url: "../api/public/user/index/id/" + id + "/username/" +data.username+"/firstname/"+data.firstname+"/lastname/"+data.lastname+"/birthdate/"+data.birthdate+"/gender/"+data.gender,
		data: {},
		dataType: 'json',
		method: "PUT",
		success: function(data){
			loadAllUsers();
			$("#update-modal").modal("hide").fadeOut();
		},
		error: function(err){
			console.log(err);
		}
	});	
}