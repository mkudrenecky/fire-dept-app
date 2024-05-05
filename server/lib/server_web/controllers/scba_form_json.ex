defmodule ServerWeb.SCBAFormJSON do
  alias Server.Forms.SCBAForm

  @doc """
  Renders a list of scba_forms.
  """
  def index(%{scba_forms: scba_forms}) do
    %{data: for(scba_form <- scba_forms, do: data(scba_form))}
  end

  @doc """
  Renders a single scba_form.
  """
  def show(%{scba_form: scba_form}) do
    %{data: data(scba_form)}
  end

  defp data(%SCBAForm{} = scba_form) do
    %{
      id: scba_form.id,
      name: scba_form.name,
      unit_number: scba_form.unit_number,
      date: scba_form.date,
      lights_working: scba_form.lights_working,
      bottle_full: scba_form.bottle_full,
      straps_extended: scba_form.straps_extended,
      clean: scba_form.clean,
      damage: scba_form.damage,
      complete: scba_form.complete
    }
  end
end
