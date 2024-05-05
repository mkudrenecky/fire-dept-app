defmodule Server.Forms do
  @moduledoc """
  The Forms context.
  """

  import Ecto.Query, warn: false
  alias Server.Repo

  alias Server.Forms.SCBAForm

  @doc """
  Returns the list of scba_forms.

  ## Examples

      iex> list_scba_forms()
      [%SCBAForm{}, ...]

  """
  def list_scba_forms do
    Repo.all(SCBAForm)
  end

  @doc """
  Gets a single scba_form.

  Raises `Ecto.NoResultsError` if the Scba form does not exist.

  ## Examples

      iex> get_scba_form!(123)
      %SCBAForm{}

      iex> get_scba_form!(456)
      ** (Ecto.NoResultsError)

  """
  def get_scba_form!(id), do: Repo.get!(SCBAForm, id)

  @doc """
  Creates a scba_form.

  ## Examples

      iex> create_scba_form(%{field: value})
      {:ok, %SCBAForm{}}

      iex> create_scba_form(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_scba_form(attrs \\ %{}) do
    %SCBAForm{}
    |> SCBAForm.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a scba_form.

  ## Examples

      iex> update_scba_form(scba_form, %{field: new_value})
      {:ok, %SCBAForm{}}

      iex> update_scba_form(scba_form, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_scba_form(%SCBAForm{} = scba_form, attrs) do
    scba_form
    |> SCBAForm.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a scba_form.

  ## Examples

      iex> delete_scba_form(scba_form)
      {:ok, %SCBAForm{}}

      iex> delete_scba_form(scba_form)
      {:error, %Ecto.Changeset{}}

  """
  def delete_scba_form(%SCBAForm{} = scba_form) do
    Repo.delete(scba_form)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking scba_form changes.

  ## Examples

      iex> change_scba_form(scba_form)
      %Ecto.Changeset{data: %SCBAForm{}}

  """
  def change_scba_form(%SCBAForm{} = scba_form, attrs \\ %{}) do
    SCBAForm.changeset(scba_form, attrs)
  end
end
