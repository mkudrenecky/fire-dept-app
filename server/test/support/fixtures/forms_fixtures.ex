defmodule Server.FormsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Server.Forms` context.
  """

  @doc """
  Generate a scba_form.
  """
  def scba_form_fixture(attrs \\ %{}) do
    {:ok, scba_form} =
      attrs
      |> Enum.into(%{
        bottle_full: true,
        clean: true,
        complete: true,
        damage: true,
        date: ~N[2024-05-04 19:18:00],
        lights_working: true,
        name: "some name",
        straps_extended: true,
        unit_number: 42
      })
      |> Server.Forms.create_scba_form()

    scba_form
  end
end
