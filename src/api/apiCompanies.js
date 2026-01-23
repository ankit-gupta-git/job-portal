import supabaseClient, { supabaseUrl } from "@/utils/supabase";

// Fetch all companies with optional filters
export async function getCompanies(token, filters = {}) {
  const supabase = await supabaseClient(token);
  
  let query = supabase
    .from('companies')
    .select('*', { count: 'exact' });

  // Apply filters if provided
  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }
  if (filters.location) {
    query = query.eq('location', filters.location);
  }
  if (filters.industry) {
    query = query.contains('industry', [filters.industry]);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }

  return { data, count };
}

// Fetch single company by ID
export async function getCompanyById(token, companyId) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from('companies')
    .select('*, jobs(*)') // Include related jobs
    .eq('id', companyId)
    .single();

  if (error) {
    console.error(`Error fetching company ${companyId}:`, error);
    throw error;
  }

  return data;
}

// Add Company
export async function addNewCompany(token, _, companyData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${companyData.name}`;

  const { error: storageError } = await supabase.storage
    .from("company-logo")
    .upload(fileName, companyData.logo);

  if (storageError) throw new Error("Error uploading Company Logo");

  const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;

  const { data, error } = await supabase
    .from("companies")
    .insert([
      {
        name: companyData.name,
        logo_url: logo_url,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error submitting Companys");
  }

  return data;
}
