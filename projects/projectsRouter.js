const express = require("express");
const Projects = require("../data/helpers/projectModel");

const router = express.Router();

// CREATE NEW PROJECT
router.post("/", async (req, res) => {
	const newProject = req.body;

	try {
		const createdProject = await Projects.insert(newProject);
		res.status(200).json(createdProject);
	} catch (error) {
		res.status(500).json({ errorMessage: "Error creating new project" });
	}
});

// GET PROJECTS
router.get("/", async (req, res) => {
	try {
		const projects = await Projects.get();
		res.status(200).json(projects);
	} catch (error) {
		res.status(500).json({ errorMessage: "Error getting projects" });
	}
});

// UPDATE PROJECT
router.patch("/:id", async (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	try {
		const updatedProject = await Projects.update(id, changes);
		res.status(200).json(updatedProject);
	} catch (error) {
		res.status(500).json({ errorMessage: "Error updating project" });
	}
});

// DELETE PROJECT
router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const deletedProject = await Projects.remove(id);
		deletedProject > 0
			? res.status(200).json({ message: "Project delete" })
			: res
					.status(400)
					.json({ message: "No record exists with provided id" });
	} catch (error) {
		res.status(500).json({ errorMessage: "Error deleting project" });
	}
});

module.exports = router;
