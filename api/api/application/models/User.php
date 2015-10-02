<?php
class Application_Model_User{	
	private $db;

	public function __construct(){
		$this->db = Zend_Db_Table::getDefaultAdapter();
	}

	public function save($data = array()){
		return $this->db->insert("user", $data);
	}

	public function update($data, $id){
		return $this->db->update("user", $data, "id = " . (int)$id);
	}

	public function delete($id){
		return $this->db->delete("user", "id = " . $id);
	}

	public function getAll(){
		return $this->db->fetchAll("select * from user");
	}

	public function findByName($name = ""){
		return $this->db->fetchAll("select * from user where username = '" . $name . "'");
	}

	public function findById($id){
		return $this->db->fetchAll("select * from user where id = '" . $id . "'");
	}
}