defmodule ServerWeb.SCBAFormController do
  use ServerWeb, :controller

  alias Server.Forms
  alias Server.Forms.SCBAForm

  action_fallback ServerWeb.FallbackController

  def index(conn, _params) do
    scba_forms = Forms.list_scba_forms()
    render(conn, :index, scba_forms: scba_forms)
  end

  def create(conn, %{"scba_form" => scba_form_params}) do
    with {:ok, %SCBAForm{} = scba_form} <- Forms.create_scba_form(scba_form_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/scba_forms/#{scba_form}")
      |> render(:show, scba_form: scba_form)
    end
  end

  def show(conn, %{"id" => id}) do
    scba_form = Forms.get_scba_form!(id)
    render(conn, :show, scba_form: scba_form)
  end

  def update(conn, %{"id" => id, "scba_form" => scba_form_params}) do
    scba_form = Forms.get_scba_form!(id)

    with {:ok, %SCBAForm{} = scba_form} <- Forms.update_scba_form(scba_form, scba_form_params) do
      render(conn, :show, scba_form: scba_form)
    end
  end

  def delete(conn, %{"id" => id}) do
    scba_form = Forms.get_scba_form!(id)

    with {:ok, %SCBAForm{}} <- Forms.delete_scba_form(scba_form) do
      send_resp(conn, :no_content, "")
    end
  end
end
