const express = require("express");
const Projects = require("./data/helpers/projectModel");

const projectsRouter = require("./projects/projectsRouter");
const actionsRouter = require('./actions/actionsRouter')

const server = express();

server.use(express.json());
server.use("/api/projects", projectsRouter);
server.use('/api/projects/:id/actions', validateProjectId)
server.use('/api/projects/:id/actions', actionsRouter)

server.get("/", (req, res) => res.send(`<h1>API is up and running !<h1>`));

// VALIDATE PROJECT ID
async function validateProjectId(req, res, next) {
	const { id } = req.params;

	try {
		const found = await Projects.get(id);

		!id
			? res.status(404).json({ message: "Must provide project id" })
			: found
			? (req.project = found)
			: res.status(404).json({ message: "Invalid project id" });

		next();
	} catch (error) {
		res.status(500).json({ errorMessage: "Error validating project id" });
	}
}

module.exports = server;
