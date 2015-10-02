<?php

class UserController extends Zend_Controller_Action{

	private $db;
	private $model;

	public function init(){
		$this->_helper->viewRenderer->setNoRender(true);
		$this->model = new Application_Model_User();
	}

	public function indexAction(){
		$method = $this->getRequest()->getMethod();

		switch($method){
			case "GET":
				$this->getUser();
			break;
			case "PUT":
				$this->updateUser();
			break;
			case "DELETE":					
				$this->deleteUser();
			break;
			case "POST":
				$this->saveUser();
			break;
		}
	}

	private function getUser(){
		$name = $this->getParam("name");
		$id = $this->getParam("id");
		if(!empty($name)){			
			$result = $this->model->findByName($name);
		}else if(!empty($id)){
			$result = $this->model->findById($id);
		}
		else{			
			$result = $this->model->getAll();
		}
		$data = array("status" => 200, "count" => count($result), "result" => $result);
		$this->_helper->json($data);
	}

	private function updateUser(){
		$id = $this->getParam("id");		
		if(!empty($id)){
			$data = array(
				"username" => $this->getParam("username"),
				"firstname" => $this->getParam("firstname"),
				"lastname" => $this->getParam("lastname"),
				"birthdate" => date("Y-m-d", strtotime($this->getParam("birthdate"))),
				"gender" => $this->getParam("gender")
			);
			if($this->model->update($data, $id)){
				return $this->_helper->json(array("status" => 200, "msg" => "success"));
			}
		}
		return $this->_helper->json(array("status" => 400, "msg" => "error"));
	}

	private function deleteUser(){		
		$id = $this->getParam("userid");
		
		if(!empty($id)){
			if($this->model->delete($id)){
				return $this->_helper->json(array("status" => 200, "msg" => "success"));
			}
		}
		return $this->_helper->json(array("status" => 400, "msg" => "error"));
	}

	private function saveUser(){
		$data = array(
			"username" => $this->getParam("username"),
			"firstname" => $this->getParam("firstname"),
			"lastname" => $this->getParam("lastname"),
			"birthdate" => date("Y-m-d", strtotime($this->getParam("birthdate"))),
			"gender" => $this->getParam("gender")
		);
		if($this->model->save($data)){
			return $this->_helper->json(array("status" => 200, "msg" => "success"));
		}
		
		return $this->_helper->json(array("status" => 400, "msg" => "error"));
	}
}