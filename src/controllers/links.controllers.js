import pool from "../database.js";

export const addJob = (req, res) => res.render("links/add");

export const postAddJob = async (req, res) => {
  const { title, url, description } = req.body;
  try {
    const newLink = {
      title,
      url,
      description,
    };
    await pool.query("INSERT INTO links set ?", [newLink]);
    req.flash("success", "Link saved successfully");
    res.redirect("/links");
  } 
  catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const allJobs = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM links");
    res.render("links/list", { rows });
  } 
  catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM links WHERE id = ?", [id]);
    req.flash("success", "Link removed successfully");
    res.redirect("/links");
  } 
  catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const editJob = async (req, res) => {
  try {
    const { id } = req.params;
    const [link] = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
    res.render("links/edit", { link: link[0] });
  } 
  catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const postEditJob = async (req, res) => {
  const { id } = req.params;
  const { title, description, url } = req.body;
  try {
    const newLink = {
      title,
      description,
      url,
    };
    await pool.query("UPDATE links set ? WHERE id = ?", [newLink, id]);
    req.flash("success", "Link updated successfully");
    res.redirect("/links");
  } 
  catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
