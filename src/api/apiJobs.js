import supabaseClient from "@/utils/supabase";

// =====================
// Fetch Jobs (PUBLIC)
// =====================
export async function getJobs(_token, { location, company_id, searchQuery }) {
  // IMPORTANT: public / anon client
  const supabase = await supabaseClient(null);

  let query = supabase
    .from("jobs")
    .select("*, company: companies!left(name,logo_url)");

  if (location && location.trim() !== "") {
    query = query.eq("location", location.trim());
  }

  if (company_id && String(company_id).trim() !== "") {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery && searchQuery.trim() !== "") {
    query = query.ilike("title", `%${searchQuery.trim()}%`);
  }

  const { data, error } = await query;

  console.log("FINAL JOBS:", data, error);

  return data ?? [];
}

// =====================
// Read Saved Jobs (AUTH)
// =====================
export async function getSavedJobs(token) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job: jobs(*, company: companies!left(name,logo_url))");

  if (error) {
    console.error("Error fetching Saved Jobs:", error);
    return [];
  }

  return data ?? [];
}

// =====================
// Read Single Job (PUBLIC)
// =====================
export async function getSingleJob(_token, { job_id }) {
  const supabase = await supabaseClient(null);

  const { data, error } = await supabase
    .from("jobs")
    .select("*, company: companies!left(name,logo_url)")
    .eq("id", job_id)
    .single();

  if (error) {
    console.error("Error fetching Job:", error);
    return null;
  }

  return data;
}

// =====================
// Save / Unsave Job (AUTH)
// =====================
export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    const { error } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (error) {
      console.error("Error removing saved job:", error);
      return false;
    }

    return true;
  }

  const { error } = await supabase
    .from("saved_jobs")
    .insert([saveData]);

  if (error) {
    console.error("Error saving job:", error);
    return false;
  }

  return true;
}

// =====================
// Toggle Hiring Status (AUTH)
// =====================
export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error Updating Hiring Status:", error);
    return null;
  }

  return data;
}

// =====================
// Get My Jobs (AUTH)
// =====================
export async function getMyJobs(token, { recruiter_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select("*, company: companies!left(name,logo_url)")
    .eq("recruiter_id", recruiter_id);

  if (error) {
    console.error("Error fetching Jobs:", error);
    return [];
  }

  return data ?? [];
}

// =====================
// Delete Job (AUTH)
// =====================
export async function deleteJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  const { error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id);

  if (error) {
    console.error("Error deleting job:", error);
    return false;
  }

  return true;
}

// =====================
// Add New Job (AUTH)
// =====================
export async function addNewJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select()
    .single();

  if (error) {
    console.error("Error Creating Job:", error);
    throw new Error("Error Creating Job");
  }

  return data;
}
