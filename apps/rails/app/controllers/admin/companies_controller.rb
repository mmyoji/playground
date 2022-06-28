class Admin::CompaniesController < Admin::BaseController
  # GET /companies
  def index
    @companies = Company.all.order(id: :desc)
  end

  # GET /companies/:id
  def show
    @company = Company.find(params[:id])
  end

  # GET /companies/new
  def new
    @company = Company.new
  end

  # POST /companies
  def create
    @company = Company.new(company_params)
    if @company.save
      redirect_to admin_company_path(@company), notice: t("created")
    else
      render :new
    end
  end

  # GET /companies/:id/edit
  def edit
    @company = Company.find(params[:id])
  end

  # PATCH /companies/:id
  def update
    @company = Company.find(params[:id])
    if @company.update(company_params)
      redirect_to admin_company_path(@company), notice: t("updated")
    else
      render :edit
    end
  end

  # DELETE /companies/:id
  def destroy
    Company.destroy(params[:id])
    redirect_to admin_companies_path, notice: t("deleted")
  end

  private

  def company_params
    params.require(:company)
      .permit(:name, :tel, :email, :address, :founded_at)
  end
end
