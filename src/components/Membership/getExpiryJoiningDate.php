<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
include_once('./dbcongigCurl.php');


function calculateExpirydate($dateString,$expiryYear){
	if(!$dateString) return "";
	$date = DateTime::createFromFormat('Y-m-d H:i:s.u', $dateString);
	$expiy = $date->format('d-m');
	return $expiy."-".$expiryYear;
}

function covverData($dateString){
	if(!$dateString) return "";
	$date = DateTime::createFromFormat('Y-m-d H:i:s.u', $dateString);
	return $date->format('d-m-Y');
}

$id = $_GET['id'];
$sql = "SELECT MembershipJoinDate,MembershipCurrentExpiryYear,MembershipId FROM userprofile WHERE id = $id";
$stmt = $conn->query($sql);
$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

$list = [
	'MembershipJoinDate'	=>	covverData($row[0]['MembershipJoinDate']),
	'expirydate' 			=>	calculateExpirydate($row[0]['MembershipJoinDate'],$row[0]['MembershipCurrentExpiryYear']),
	'MembershipId'			=>  $row[0]['MembershipId']
];

echo json_encode($list);
?>