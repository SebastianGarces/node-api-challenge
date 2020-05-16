const express = require("express");
const Projects = require("../data/helpers/projectModel");
const Actions = require("../data/helpers/actionModel");

const router = express.Router();

// CREATE NEW ACTION
router.post("/", async (req, res) => {
	const newAction = req.body;
	const { id } = req.project;

	newAction.project_id = id;

	try {
		const createdAction = await Actions.insert(newAction);
		res.status(200).json(createdAction);
	} catch (error) {
		res.status(500).json({ errorMessage: "Error creating new action" });
	}
});

// GET PROJECT'S ACTIONS
router.get("/", async (req, res) => {
	console.log(req.project);
	const { id } = req.project;

	try {
		const actions = await Projects.getProjectActions(id);
		res.status(200).json(actions);
	} catch (error) {
		res.status(500).json({ errorMessage: "Error getting actions" });
	}
});

// UPDATE ACTION
router.patch("/:id", async (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	try {
		const updatedAction = await Actions.update(id, changes);
		res.status(200).json(updatedAction);
	} catch (error) {
		res.status(500).json({ errorMessage: "Error updating action" });
	}
});

// DELETE ACTION
router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const deletedAction = await Actions.remove(id);
		deletedAction > 0
			? res.status(200).json({ message: "Action delete" })
			: res
					.status(400)
					.json({ message: "No record exists with provided id" });
	} catch (error) {
		res.status(500).json({ errorMessage: "Error deleting action" });
	}
});

module.exports = router;
